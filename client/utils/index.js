import { get } from 'lodash';

export const hasData = props => node => get(props.data, node);
