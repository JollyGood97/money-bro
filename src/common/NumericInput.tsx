import React, {FC} from 'react';
import {Input, InputGroup, InputLeftAddon} from 'native-base';

type NumericInputProps = {
  onChange: ((text: string) => void) | undefined;
};

const NumericInput: FC<NumericInputProps> = (props: NumericInputProps) => {
  const {onChange} = props;

  return (
    <InputGroup
      w={{
        base: '70%',
        md: '285',
      }}>
      <InputLeftAddon children={'$'} />
      <Input
        w={{
          base: '70%',
          md: '100%',
        }}
        keyboardType="numeric"
        onChangeText={onChange}
      />
    </InputGroup>
  );
};

export default NumericInput;
