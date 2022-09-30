import React, {FC, ReactNode} from 'react';
import {Button, Heading, Modal} from 'native-base';
import {GestureResponderEvent} from 'react-native';

type ModalProps = {
  heading: string;
  showModal: boolean;
  setShowModal: Function;
  onSave: ((event: GestureResponderEvent) => void) | null;
  isLoading?: boolean;
  children: ReactNode;
  disableSave?: boolean;
};

const CommonModal: FC<ModalProps> = (props: ModalProps) => {
  const {
    children,
    heading,
    showModal,
    setShowModal,
    onSave,
    isLoading,
    disableSave = false,
  } = props;

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Body>
          <Heading m={2}>{heading}</Heading>
          {children}
          <Button.Group space={2} marginTop={8}>
            <Button
              w={{
                base: '50%',
                md: '100%',
              }}
              variant="outline"
              colorScheme="indigo"
              borderColor="#4f46e5"
              borderWidth="1"
              onPress={() => {
                setShowModal(false);
              }}>
              Cancel
            </Button>
            <Button
              w={{
                base: '50%',
                md: '100%',
              }}
              isLoading={isLoading}
              colorScheme="indigo"
              onPress={onSave}
              disabled={disableSave}>
              Save
            </Button>
          </Button.Group>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default CommonModal;
