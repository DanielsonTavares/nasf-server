import Knex from 'knex';
import knexfile from '../../knexfile';

const knex = Knex(process.env.NODE_ENV === 'test' ? knexfile.test : knexfile.development);

export default knex;
