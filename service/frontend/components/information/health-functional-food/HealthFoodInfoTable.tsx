import { desktop, mobile } from "@/styles/utils";
import { AquaBlue600, AquaBlue200, AquaBlue, AquaBlue50, CyanBlue500, Gray500, CyanBlue50 } from "@/styles/variables";
import styled, { css } from "styled-components";

const HealthFoodInfoTable = styled.table`
${desktop(css`
  width: 900px;
  margin-top: 48px;
  color: ${AquaBlue600};
  font-size: 18px;
  font-weight: 500;
  border-collapse: collapse;

  tr {
    & > * {
      &:nth-child(1) {
        width: 190px;
        border-right: 1px solid ${AquaBlue200};
      }
      &:nth-child(2) {
        width: 460px;
      }
      &:nth-child(3) {
        border-left: 1px solid ${AquaBlue200};
        width: 340px;
      }
    }

    th {
      height: 48px;
      border-top: 1px solid ${AquaBlue200};
      border-bottom: 1px solid ${AquaBlue200};

      &:nth-child(1) {
        border-right: 1px solid ${AquaBlue};
        background: ${AquaBlue50};
      }
      &:nth-child(2) {
        color: white;
        background: ${AquaBlue};
      }
      &:nth-child(3) {
        color: white;
        border-left: 1px solid ${AquaBlue};
        background: ${CyanBlue500};
      }
    }

    td {
      padding: 34px 0;
      background: ${AquaBlue50};
      border-bottom: 1px solid ${AquaBlue200};

      b {
        color: ${AquaBlue};
        font-size: 18px;
        font-weight: 700;
      }

      &:nth-child(1) {
      }
      &:nth-child(2) {
        background: white;
      }
      &:nth-child(3) {
        color: ${Gray500};
        font-weight: 400;
        background: ${CyanBlue50};
      }
    }
    .t1 {
      background: white;
    }
  }
`)}

${mobile(css`
  width: 100%;
  margin-top: 32px; 
  color: ${AquaBlue600};
  font-size: 14px;
  font-weight: 500;
  border-collapse: collapse;

  th[colSpan="2"] {
    color: white;
    font-size: 16px;
    height: 40px;
    background: ${AquaBlue};
  }
  th[colSpan="2"].t1 {
    background: ${CyanBlue500};
  }
  th {
    width: 116px;
    background: ${AquaBlue50};
    border-bottom: 1px solid ${AquaBlue200};
  }
  td {
    background: white;
    border-bottom: 1px solid ${AquaBlue200};
    padding: 17px 0;
  }
`)}
`;

export default HealthFoodInfoTable;