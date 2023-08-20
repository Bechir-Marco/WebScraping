import { Form } from 'react-bootstrap';

type Item = { color: string[] } | { ram: string[] };

const isColorItem = (item: Item): item is { color: string[] } => {
  return 'color' in item;
};

const AttributesFilterComponent = () => {
  return (
    <>
      {[{ color: ['red', 'blue', 'green'] }, { ram: ['1 TB', '2 TB'] }].map(
        (item: Item, idx) => (
          <div key={idx} className="mb-3">
            <Form.Label>
              <b>{isColorItem(item) ? 'color' : 'ram'}</b>
            </Form.Label>
            {isColorItem(item)
              ? item.color.map((i, idx) => (
                  <Form.Check key={idx} type="checkbox" label={i} />
                ))
              : item.ram.map((i, idx) => (
                  <Form.Check key={idx} type="checkbox" label={i} />
                ))}
          </div>
        )
      )}
    </>
  );
};

export default AttributesFilterComponent;
