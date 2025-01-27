import { BadRequestException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsPhoneNumbers(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    try {
      registerDecorator({
        name: 'isPhoneNumbers',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            if (!Array.isArray(value)) {
              return false;
            }

            return value.every((phone) => {
              if (typeof phone !== 'string') {
                return false;
              }
              if (phone.length !== 13) {
                return false;
              }
              if (phone.slice(0, 4) !== '+998') {
                return false;
              }
              if (!Number(phone.slice(4))) {
                return false;
              }
              return true;
            });
          },
          defaultMessage(args: ValidationArguments) {
            return `All phone numbers in ${args.property} must be in this format: +998XXXXXXXXX`;
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(
        `Error on validating phone numbers in "${propertyName}": ${error.message}`,
      );
    }
  };
}
