import React from 'react';
import {createUltimatePagination, ITEM_TYPES} from 'react-ultimate-pagination';
import Button from 'material-ui/Button';
import NavigationFirstPage from 'material-ui-icons/FirstPage';
import NavigationLastPage from 'material-ui-icons/LastPage';
import NavigationChevronLeft from 'material-ui-icons/ChevronLeft';
import NavigationChevronRight from 'material-ui-icons/ChevronRight';

const ButtonStyle = {
  default: {
    minWidth: 37,
    color: '#757575'
  },
  active: {
    minWidth: 37,
    backgroundColor: '#1E88E5',
    color: 'white'
  }
};

const IconStyle = {
  maxWidth: 16,
  maxHeight: 16,
};

const Page = ({value, isActive, onClick}) => (
  <Button dense 
    style={isActive ? ButtonStyle.active : ButtonStyle.default}
    onClick={onClick}>{value.toString()}</Button>
);

const Ellipsis = ({onClick}) => (
  <Button dense style={ButtonStyle.default} onClick={onClick}>...</Button>
);

const FirstPageLink = ({isActive, onClick}) => (
  <Button dense style={ButtonStyle.default} children={<NavigationFirstPage style={IconStyle}/>} onClick={onClick}/>
);

const PreviousPageLink = ({isActive, onClick}) => (

  <Button dense style={ButtonStyle.default} children={<NavigationChevronLeft style={IconStyle}/>} onClick={onClick}/>
);

const NextPageLink = ({isActive, onClick}) => (
  <Button dense style={ButtonStyle.default} children={<NavigationChevronRight style={IconStyle}/>} onClick={onClick}/>
);

const LastPageLink = ({isActive, onClick}) => (
  <Button dense style={ButtonStyle.default} children={<NavigationLastPage style={IconStyle}/>} onClick={onClick}/>
);

const itemTypeToComponent = {
  [ITEM_TYPES.PAGE]: Page,
  [ITEM_TYPES.ELLIPSIS]: Ellipsis,
  [ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
  [ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
  [ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
  [ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink
};

const UltimatePaginationMaterialUi = createUltimatePagination({itemTypeToComponent});

export default UltimatePaginationMaterialUi;