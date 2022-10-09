import { AutoComplete, AutoCompleteProps, Form } from 'antd';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useToggle from '#/shared/hooks/useToggle';
import { Store } from 'antd/lib/form/interface';

interface Props {
  onChange?: (value: string) => void;
}

enum Status {
  OK = 'OK',
}

function AddressSelector({
  onClear,
  onChange,
  ...rest
}: Props & AutoCompleteProps) {
  const [visible, open] = useToggle(false);

  const {
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    debounce: 400,
  });

  const handleChange = (e: string) => {
    onChange?.(e);
    setValue(e);
  };

  const handleSelect = async (
    value: string,
    setFieldsValue: (values: Store) => void,
  ) => {
    const results = await getGeocode({ address: value });
    const coordinates = await getLatLng(results[0]);
    setFieldsValue({
      coordinates: {
        lat: coordinates.lat,
        long: coordinates.lng,
      },
    });
  };

  const renderSuggestions = data.map(suggestion => {
    const {
      structured_formatting: {
        ['main_text']: mainText,
        ['secondary_text']: secondaryText,
      },
    } = suggestion;
    return {
      label: `${mainText ?? ''} ${secondaryText ?? ''}`,
      value: `${mainText ?? ''} ${secondaryText ?? ''}`,
    };
  });

  return (
    <Form.Item shouldUpdate noStyle>
      {({ setFieldsValue }) => (
        <>
          <AutoComplete<string>
            options={status === Status.OK && visible ? renderSuggestions : []}
            onChange={handleChange}
            allowClear={visible}
            onClear={onClear}
            dropdownMatchSelectWidth={320}
            onClick={open}
            id="searchPlaces-control"
            onSelect={(value: string) => handleSelect(value, setFieldsValue)}
            {...rest}
          />
          <Form.Item name="coordinates" hidden>
            <Form.Item name={['coordinates', 'long']}></Form.Item>
            <Form.Item name={['coordinates', 'lat']}></Form.Item>
          </Form.Item>
        </>
      )}
    </Form.Item>
  );
}

export default AddressSelector;
