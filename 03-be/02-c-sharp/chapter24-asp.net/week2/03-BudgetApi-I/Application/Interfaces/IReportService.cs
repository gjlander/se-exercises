using BudgetApi.Dtos.Reports;


namespace Application.Interfaces;

public interface IReportService
{
    Task<SummaryReportResponseDto> GetSummaryAsync(DateOnly start, DateOnly end, string type);
}