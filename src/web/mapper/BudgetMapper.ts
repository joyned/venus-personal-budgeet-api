import { Budget } from '../../core/entity/Budget';
import { BudgetDto } from '../dto/BudgetDTO';

export class BudgetMapper {
  toDto(entity: Budget): BudgetDto {
    const { id, value, date, type, left } = entity;
    return { id, value, date, type, left };
  }

  toEntity(dto: BudgetDto): Budget {
    const { id, value, date, type, left } = dto;
    return { id, value, date, type, left };
  }

  toEntityList(dtos: BudgetDto[]): Budget[] {
    return dtos.map((dto) => this.toEntity(dto));
  }

  toDtoList(entities: Budget[]): BudgetDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
