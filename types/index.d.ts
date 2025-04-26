/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  declare type Status = "pending" | "scheduled" | "cancelled";
  
  declare interface CreateUserParams {
    pseudo: string;
    email: string;
    password: string;
    name?: string
  }
  declare interface User extends CreateUserParams {
    $id: string;
  }
  
  declare interface RegisterUserParams extends CreateUserParams {
    userId?: string | null;
    nom: string;
    prenom: string;
    email: Email;
    phone?: string;
    pseudo: string;
    bureau: string;
    direction: string;
    service: string;
    password: string;
  }
  
  declare type CreateSignalementParams = {
    userId: string;
    utilisateur: string;
    panne: string;
    description?: string | undefined;
    note?: string | undefined;
    //date: Date;
    status: Status;
   
  };
  
  declare type UpdateSignalementParams = {
    signalementId: string;
    userId: string;
    timeZone: string;
    signalement: Signalement;
    type: string;
  };