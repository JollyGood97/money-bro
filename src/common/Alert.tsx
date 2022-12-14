import React, {FC} from 'react';
import {
  Alert,
  IAlertProps,
  HStack,
  IconButton,
  Text,
  VStack,
} from 'native-base';
//@ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface AlertProps extends IAlertProps {
  alertType: 'success' | 'warning' | 'error' | 'info';
  message: string;
  setShowAlert: Function;
}

const AlertNotice: FC<AlertProps> = (props: AlertProps) => {
  const {alertType, message, setShowAlert} = props;

  const iconType =
    alertType === 'success'
      ? 'check-circle'
      : alertType === 'error'
      ? 'alert'
      : alertType === 'warning'
      ? 'exclamation-thick'
      : 'information';

  const iconColor =
    alertType === 'success'
      ? '#15803d'
      : alertType === 'error'
      ? '#b91c1c'
      : '#c2410c';

  return (
    <Alert w="100%" status={alertType}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1} paddingTop={1} paddingRight={2}>
            <Icon name={iconType} size={24} color={iconColor} />
            <Text fontSize="12px" marginRight={2} color="black">
              {message}
            </Text>
          </HStack>
          <IconButton
            onPress={() => setShowAlert(false)}
            marginTop={-1}
            _focus={{
              borderWidth: 0,
            }}
            icon={<Icon name="close" size={16} color="black" />}
          />
        </HStack>
      </VStack>
    </Alert>
  );
};

export default AlertNotice;
