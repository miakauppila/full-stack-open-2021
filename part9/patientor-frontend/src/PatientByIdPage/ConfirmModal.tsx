import React, { Component } from 'react';
import { Button, Confirm } from 'semantic-ui-react';

interface ModalProps {
  onConfirm: () => Promise<void>;
}

class ConfirmModal extends Component<ModalProps> {
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleConfirm = () => {
    void this.props.onConfirm();
    this.close();
  };

  render() {
    return (
      <div>
        <Button icon="trash alternate" onClick={this.open}/>
        <Confirm
          open={this.state.open}
          header="Are you sure you want to delete this entry?"
          content={null}
          onCancel={this.close}
          onConfirm={this.handleConfirm}
        />
      </div>
    );
  }
}

export default ConfirmModal;
