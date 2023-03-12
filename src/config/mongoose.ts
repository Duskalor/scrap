import { connect } from 'mongoose';

export const db = () => {
  return connect(`${process.env.URI_MOONGO}`);
};
