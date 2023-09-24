type LeftJSON<T> = {
  tag: "LEFT";
  error: T;
};

type RightJSON<T> = {
  tag: "RIGHT";
  value: T;
};

export class Left<T> {
  readonly error: T;

  private constructor(error: T) {
    this.error = error;
  }

  isLeft(): this is Left<T> {
    return true;
  }

  isRight(): this is Right<never> {
    return false;
  }

  static create<U>(error: U): Left<U> {
    return new Left(error);
  }

  toJSON(): LeftJSON<T> {
    return {
      tag: "LEFT",
      error: this.error,
    };
  }
}

export class Right<T> {
  readonly value: T;

  private constructor(value: T) {
    this.value = value;
  }

  isLeft(): this is Left<never> {
    return false;
  }

  isRight(): this is Right<T> {
    return true;
  }

  static create<U>(value: U): Right<U> {
    return new Right(value);
  }

  toJSON(): RightJSON<T> {
    return {
      tag: "RIGHT",
      value: this.value,
    };
  }
}

export type Either<T, U> = Left<T> | Right<U>;
export type EitherJSON<T, U> = LeftJSON<T> | RightJSON<U>;

export function convertEitherToEitherJSON<T, U>(
  either: Either<T, U>
): EitherJSON<T, U> {
  return either.toJSON();
}

export function convertEitherJSONToEither<T, U>(
  eitherJSON: EitherJSON<T, U>
): Either<T, U> {
  return eitherJSON.tag === "RIGHT"
    ? Right.create(eitherJSON.value)
    : Left.create(eitherJSON.error);
}
