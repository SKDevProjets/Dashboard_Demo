export interface Client {
    id: number;
    name: string;
    email: string | null;
    status: string;
    company_id: number;
    client_contact: unknown;
    session: unknown;
}

export interface ClientsResponse {
    data: Client[];
}