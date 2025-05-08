import { DefaultNamingStrategy } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

const snakeUpperCase = (str: string) => snakeCase(str).toUpperCase();

export class SnakeUpper extends DefaultNamingStrategy {
  tableName(className: string, customName: string): string {
    return customName ? customName : snakeUpperCase(className);
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return (
      snakeUpperCase(embeddedPrefixes.concat('').join('_')) + (customName ? customName : snakeUpperCase(propertyName))
    );
  }

  relationName(propertyName: string): string {
    return snakeUpperCase(propertyName);
  }

  joinColumnName(_: string, referencedColumnName: string): string {
    return snakeUpperCase(referencedColumnName);
  }

  joinTableName(firstTableName: string, secondTableName: string, firstPropertyName: string): string {
    return snakeUpperCase(firstTableName + '_' + firstPropertyName.replace(/\./gi, '_') + '_' + secondTableName);
  }

  joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
    return snakeUpperCase(tableName + '_' + (columnName ? columnName : propertyName));
  }

  classTableInheritanceParentColumnName(parentTableName: any, parentTableIdPropertyName: any): string {
    return snakeUpperCase(parentTableName + '_' + parentTableIdPropertyName);
  }

  eagerJoinRelationAlias(alias: string, propertyPath: string): string {
    return alias + '__' + propertyPath.replace('.', '_');
  }
}
