export class DateUtils {
    public months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ]

    public weekDay = [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado',
    ]

    formatDateToVerbose(date: Date): string {
        return (
            this.weekDay[date.getDay()] +
            ' ' +
            date.getDate() +
            ' de ' +
            this.months[date.getMonth()] +
            ' de ' +
            date.getFullYear()
        )
    }
}
