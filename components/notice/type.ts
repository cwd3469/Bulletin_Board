export interface NoticeInterface {
  ulid: string;
  title: string;
  type: string;
  createdAt: string;
  id: number;
}
export interface NoticeDetailInterface extends NoticeInterface {
  contents: string;
}
