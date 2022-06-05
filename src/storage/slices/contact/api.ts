import Catch from "storage/cache";

import { CatchStorageKeys } from "storage/cache/types";
import { IContact, TNewContact } from "./types";

class ContactApi {
  async query(): Promise<IContact[]> {
    const result = await Catch.get<IContact[]>(CatchStorageKeys.contacts);
    return result || [];
  }

  async create(data: TNewContact): Promise<IContact> {
    const conatcts = await this.query();
    const nextId =
      conatcts.length > 0 ? conatcts[conatcts.length - 1].id + 1 : 1040;
    const newContact: IContact = {
      ...data,
      id: nextId,
    };

    conatcts.push(newContact);

    await Catch.set(CatchStorageKeys.contacts, conatcts);

    return newContact;
  }

  async update(data: Partial<IContact>): Promise<IContact | null> {
    const conatcts = await this.query();
    const index = conatcts.findIndex((contact) => contact.id === data.id);

    if (index !== -1) {
      conatcts[index] = {
        ...conatcts[index],
        ...data,
      };

      await Catch.set(CatchStorageKeys.contacts, conatcts);

      return conatcts[index];
    }

    return null;
  }

  async delete(id: number): Promise<void> {
    const conatcts = await this.query();
    const index = conatcts.findIndex((contact) => contact.id === id);

    if (index !== -1) {
      conatcts.splice(index, 1);
    }

    await Catch.set(CatchStorageKeys.contacts, conatcts);
  }
}

export default new ContactApi();
