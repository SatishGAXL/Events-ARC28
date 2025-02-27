import { Contract } from '@algorandfoundation/tealscript';

// Define a contract class named Event, inheriting from the base Contract class.
class Event extends Contract {
  // Define an event logger for the CalledMethodEvent.
  // It logs the sender's address and a message.
  CalledMethodEvent = new EventLogger<{
    sender: Address;
    msg: string;
  }>();

  // Define a method to create the application.
  // It logs an event indicating that the application has been created.
  createApplication(): void {
    this.CalledMethodEvent.log({ sender: this.txn.sender, msg: 'Created app' });
  }

  // Define the first method.
  // It logs an event indicating that the first method has been called.
  first_method(): void {
    this.CalledMethodEvent.log({ sender: this.txn.sender, msg: 'Called First Method' });
  }

  // Define the second method.
  // It logs an event indicating that the second method has been called.
  second_method(): void {
    this.CalledMethodEvent.log({ sender: this.txn.sender, msg: 'Called Second Method' });
  }
}
