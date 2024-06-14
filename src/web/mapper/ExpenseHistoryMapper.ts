import { ExpenseHistory } from '../../core/entity/ExpenseHistory';
import { ExpenseType } from '../../core/model/ExpenseType';
import { ExpenseHistoryDto } from '../dto/ExpenseHistoryDTO';

export class ExpenseHistoryMapper {
  toDto(entity: ExpenseHistory): ExpenseHistoryDto {
    const { id, item, value, date, type } = entity;
    return { id, item, value, date, type: type.toString() };
  }

  toEntity(dto: ExpenseHistoryDto): ExpenseHistory {
    const { id, item, value, date, type } = dto;
    return {
      id,
      item,
      value,
      date,
      type: ExpenseType[type as keyof typeof ExpenseType],
    };
  }

  toEntityList(dtos: ExpenseHistoryDto[]): ExpenseHistory[] {
    return dtos.map((dto) => this.toEntity(dto));
  }

  toDtoList(entities: ExpenseHistory[]): ExpenseHistoryDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
