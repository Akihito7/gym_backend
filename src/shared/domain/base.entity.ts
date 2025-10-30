export abstract class BaseEntity {
  private _id?: number
  private _createdAt?: Date
  private _updatedAt?: Date

  constructor(id?: number, createdAt?: Date, updatedAt?: Date) {
    this._id = id;
    this._createdAt = createdAt ?? new Date()
    this._updatedAt = updatedAt;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }

  setUpdateAt(updatedAtDate?: Date) {
    this._updatedAt = updatedAtDate ?? new Date();
  }
}