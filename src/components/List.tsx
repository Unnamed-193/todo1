import { DealApi } from '../App';
import Item from './Item';
import './list.css'

interface ListProps {
  deals: DealApi[]; // Массив объектов Deal
  onDelete: (id: string) => void;
}

function List({ deals, onDelete }: ListProps) {

  return (
    <ul className='tasks-list'>
      {deals.map((item) => (
        <Item deal={item} key={item.id} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default List;
