import * as cheerio from 'cheerio';
import got from 'got';
import { fdBody } from './helper';
import fs from 'fs/promises';
import { getCollection } from './mongodb';
import { NaverPosts } from 'hsin';
 
export const reqSeriesName = async (memberNo: string, seriesNo: string) => {
  return await got.get('https://m.post.naver.com/my/series/detail.naver', {
    searchParams: {
      seriesNo,
      memberNo,
    }
  }).text();
}

export const reqSeriesList = async (memberNo: string, seriesNo: string, i: string) => {
  const res = await got.get('https://m.post.naver.com/my/series/detail/more.nhn', {
    searchParams: {
      memberNo,
      seriesNo,
      fromNo: i,
      totalCount: '0',
    }
  }).text();

  const val = res.replace(/\\"/g, '${DQ}').replace(/\\'/g, '${SQ}');
  // await fs.writeFile('./test.txt', val);
  const list = JSON.parse(val);
  list.html = list.html.replace(/\$\{DQ\}/g, '"').replace(/\$\{SQ\}/g, "'");

  return list as {
    resultCode: string;
    fromNo: string;
    nextFromNo: string;
    listCount: string;
    lastSortOrder: string;
    totalCount: string;
    prevVolumeNo: string;
    html: string;
  };
}

export const getAllPostList = async (memberNo: string, seriesNo: string) => {
  const np = await getCollection<NaverPosts>('_naver_posts');

  const text = await reqSeriesName(memberNo, seriesNo);
  let seriesName: string;
  if (text) {
    const $ = cheerio.load(text);
    seriesName = ($('.ell')[0].firstChild as any).data;
  }

  let i = '1';
  const r = [];
  while (i) {
    console.log(i);
    const {html, nextFromNo} = await reqSeriesList(memberNo, seriesNo, i);
    const $ = cheerio.load(html);
    const postsLink = $('.list_spot_post._post_list li a').map((i, el) => el.attribs.href)
    const computedPostsLink = [...postsLink].map(str => {
      return {
        href: str,
        url: 'https://m.post.naver.com' + str,
        volumeNo: str.match(/volumeNo=(\d+?)&/)?.[1] ?? '',
        memberNo,
        seriesNo,
        seriesName,
      };
    });
    if (await np.find({volumeNo: {$in: computedPostsLink.map(({volumeNo}) => volumeNo)}}).count() === computedPostsLink.length) {
      break;
    }
    
    r.push(...computedPostsLink);
    i = nextFromNo;
  }

  return r;
};

export const syncPostList = async () => {
  const np = await getCollection<NaverPosts>('_naver_posts');

  // FIXME: 중복 제거 기능추가 필요
  const posts = [
    await getAllPostList('40955866', '588367'), // 건강더하기
    await getAllPostList('40955866', '589024'), // 카드뉴스
    await getAllPostList('40955866', '588365'), // 슬기로운 건기식 생활
    await getAllPostList('40955866', '588368'), // 건강레시피
    await getAllPostList('40955866', '646063'), // 구독자 참여이벤트
    await getAllPostList('40955866', '637159'), // 건강기능식품 섭취 주의사항
  ].flat();

  for (const post of posts) {
    if (await np.findOne({volumeNo: post.volumeNo})) continue;

    const res = await got.get(post.url).text();
    // console.log(post.url)
    // console.log(res);
    const $ = cheerio.load(res?.match?.(/<script type="x-clip-content" id="__clipContent">([^]+?)<\/script>/)?.[1] ??'');
    const title = $('h3').html()?.trim() ?? '';
    const body = $('.se_component_wrap.sect_dsc.__se_component_area').html()?.trim() ?? '';
    const tags = cheerio.load(res)('.tag.__search_tag').map((i, el) => $(el).text());
    
    const data = {
      title, 
      body, 
      tags: [...tags],
      ...post, 
    };

    await np.insertOne(data);

  }
};