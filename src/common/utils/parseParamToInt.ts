import { BadRequestException } from '@nestjs/common';

export function parseParamToInt(val: string | undefined) {
  const parsedVal = Number(val);

  if (!isNaN(parsedVal)) return parsedVal;
  else throw new BadRequestException(`${val} is not a number`);
}
