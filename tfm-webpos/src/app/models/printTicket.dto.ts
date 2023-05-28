export class PrintTicketDTO {
    email: string;
    imageBase64: string;
    numTicket: string | undefined;
  
    constructor(
        email: string,
        imageBase64: string,
        numTicket: string | undefined
    ) {
        this.email = email;
        this.imageBase64 = imageBase64;
        this.numTicket = numTicket;
    }
  } 