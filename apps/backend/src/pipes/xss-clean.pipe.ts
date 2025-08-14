import { PipeTransform, Injectable } from '@nestjs/common';
import xss from 'xss';

@Injectable()
export class XssCleanPipe implements PipeTransform {
    transform(value: unknown) {
        let cleanedValue: unknown = value;

        if (typeof value === 'string') {
            cleanedValue = xss(value);
        } else if (typeof value === 'object' && value !== null) {
            cleanedValue = Object.keys(value).reduce((acc, key) => {
                const val = (value as Record<string, unknown>)[key];
                acc[key] = typeof val === 'string' ? xss(val) : val;
                return acc;
            }, {} as Record<string, unknown>);
        }

        return cleanedValue;
    }
}
