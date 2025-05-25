import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

export interface Option {
  label: string;
  value: string;
  color?: string;
}

interface OptionSelectorProps {
  label: string;
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
}

export const OptionSelector: React.FC<OptionSelectorProps> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  console.log(options);
  const swatchStyle = (bg: string, isSelected: boolean) => ({
    width: 24,
    height: 24,
    border: isSelected ? '2px solid #333' : '1px solid #ccc',
    backgroundColor: bg,
    marginRight: 8,
    cursor: 'pointer',
  });

  if (label === 'Color') {
    return (
      <Row className="mb-2 align-items-center">
        <Col xs={4}>
          <strong>{label}</strong>
        </Col>
        <Col xs={8} className="d-flex">
          {options.map((opt) => (
            <div
              key={opt.value}
              style={swatchStyle(opt.label, selected === opt.value)}
              onClick={() => onChange(opt.value)}
            />
          ))}
        </Col>
      </Row>
    );
  }

  if (label === 'Size') {
    return (
      <Row className="mb-2 align-items-center">
        <Col xs={4}>
          <strong>{label}</strong>
        </Col>
        <Col xs={8} className="d-flex">
          {options.map((opt) => (
            <Button
              key={opt.value}
              variant={selected === opt.value ? 'primary' : 'outline-secondary'}
              size="sm"
              className="me-2"
              onClick={() => onChange(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </Col>
      </Row>
    );
  }

  return (
    <Row className="mb-2">
      <Col xs={4}>
        <strong>{label}</strong>
      </Col>
      <Col xs={8}>
        <Form.Select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          size="sm"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
};
