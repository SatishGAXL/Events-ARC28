import { Contract } from '@algorandfoundation/tealscript';

class Event extends Contract {
  
  CalledMethodEvent = new EventLogger<{
    sender: Address;
    msg: string;
  }>();

  createApplication(): void {
    this.CalledMethodEvent.log({ sender: this.txn.sender, msg: 'Created app' });
  }

  first_method(): void {
    this.CalledMethodEvent.log({ sender: this.txn.sender, msg: 'Called First Method' });
  }

  second_method(): void {
    this.CalledMethodEvent.log({ sender: this.txn.sender, msg: 'Called Second Method' });
  }
}
