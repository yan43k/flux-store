# Запускать от имени администратора: включение TCP/IP для SQL Server (MSSQLSERVER) на порту 1433.
# После выполнения Prisma и API смогут подключаться к flux_store.

$ErrorActionPreference = "Stop"

$tcpKey = "HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.MSSQLSERVER\MSSQLServer\SuperSocketNetLib\Tcp"
$ipAllKey = "$tcpKey\IPAll"

if (-not (Test-Path $tcpKey)) {
    Write-Error "Не найден ключ реестра SQL Server. Проверьте имя экземпляра (MSSQL17.MSSQLSERVER)."
}

Set-ItemProperty -Path $tcpKey -Name Enabled -Value 1
Set-ItemProperty -Path $ipAllKey -Name TcpPort -Value "1433"
Set-ItemProperty -Path $ipAllKey -Name TcpDynamicPorts -Value ""

Restart-Service MSSQLSERVER -Force
Start-Sleep -Seconds 4

Write-Host "TCP/IP включён. Проверка порта 1433..."
netstat -ano | findstr ":1433"
