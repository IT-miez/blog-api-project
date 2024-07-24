import React, { useState } from 'react';
import { Modal, Button as ModalButton, ModalOverlay, Dialog, Heading } from 'react-aria-components';
import "../styles/react-aria-modal/Modal.css"

function SuccessNotification({openingState, setOpen, setRefresh, title}) {
      return (
        <>
        <Modal isDismissable isOpen={openingState} onOpenChange={() => {setOpen(false); setRefresh(true)}}>
            <Dialog>
            <Heading slot="title">{title}</Heading>
            <p>Click outside to close this dialog.</p>
            </Dialog>
        </Modal>

        </>
      );
}

export default SuccessNotification;
