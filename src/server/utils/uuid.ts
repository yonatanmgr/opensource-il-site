import { v4 as uuidv4 } from 'uuid';

export default function getUuid(): string {
  return uuidv4();
}
