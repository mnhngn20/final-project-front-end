import styled from '@emotion/styled';
import { Menu } from 'antd';

const QuizMenu = styled(Menu)`
  background: none;
  border-right: none !important;
  width: 20rem;

  .ant-menu {
    &-sub-section-title {
      color: var(--grey-secondary-300);
    }
    &-sub {
      .ant-menu-item {
        min-height: 4.5rem;
        height: 100%;
        border-bottom: none;
        padding-left: 0.75rem !important;
        .ant-menu-sub-section-extra-content {
          transition: all 0.3s;
          overflow: hidden;
          opacity: 0;
          height: 0px;
          width: 0px;
          &-description {
            width: inherit;
            word-break: break-all;
            white-space: normal;
            line-height: 1.25rem;
          }
        }
        &-selected {
          border-color: var(--primary-color);
          border-left: 1px solid;
          background: none !important;
          font-weight: 600 !important;
          .ant-menu-sub-section-extra-content {
            opacity: 100;
            height: auto;
            width: auto;
          }
          .ant-menu-section {
            color: var(--primary-color);
          }
          &::after {
            opacity: 0;
          }
        }
      }
      .ant-menu-submenu {
        border: none;
        padding-left: 0.75rem !important;
        &-title {
          margin: 0;
        }
        .ant-menu-sub {
          border: none !important;
        }
      }
    }
    &-submenu {
      &-title {
        margin: 0px;
      }
      &-open {
        border-bottom: none;
      }
      border-bottom: 1px solid #d9dce4;
      height: auto;
      &-title {
        padding: 0px !important;
        min-height: 4.5rem;
        height: 100%;
      }
      &-arrow {
        display: absolute;
        right: 0;
        color: var(--grey-secondary-300);
      }
    }
    &-item {
      min-height: 4.5rem;
      height: auto;
      padding: 0px !important;
      margin: 0px;
      border-bottom: 1px solid #d9dce4;
      &-selected {
        border-color: var(--primary-color);
        background: none !important;
        &::after {
          opacity: 0;
        }
      }
    }
  }
`;

export default QuizMenu;
