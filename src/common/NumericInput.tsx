import React, {FC, useContext} from 'react';
import {Input, InputGroup, InputLeftAddon} from 'native-base';
import {UserContext} from '../context/UserContext';

type NumericInputProps = {
  onChange: ((text: string) => void) | undefined;
};

const NumericInput: FC<NumericInputProps> = (props: NumericInputProps) => {
  const userContext = useContext(UserContext);
  const userCurrency = userContext?.user?.currency || '';

  const {onChange} = props;

  return (
    <InputGroup
      w={{
        base: '70%',
        md: '285',
      }}>
      <InputLeftAddon children={userCurrency} />
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
