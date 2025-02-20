import { Radio, RadioGroupProps } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox/Group';
import { SIZES } from './constants.ts';
import { useGlobalState } from './globalStateContext.tsx';

const options: CheckboxGroupProps<string>['options'] = SIZES.map((el) => ({
  label: el,
  value: el,
}));

export const ChangeSize = () => {
  const { setSize, size, setIsClear } = useGlobalState();

  const handleChange: RadioGroupProps['onChange'] = (e) => {
    setSize(e.target.value);
    setIsClear(true);
  };

  return (
    <>
      <h2>Выберите размер:</h2>
      <Radio.Group
        block
        options={options}
        defaultValue='2'
        optionType='button'
        buttonStyle='solid'
        value={size}
        onChange={handleChange}
      />
    </>
  );
};
