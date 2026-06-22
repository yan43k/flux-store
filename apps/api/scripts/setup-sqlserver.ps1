# Запускать ОТ ИМЕНИ АДМИНИСТРАТОРА (один раз).
# 1) TCP/IP на 1433
# 2) Смешанная аутентификация (Windows + SQL)
# 3) Логин flux_app для Node.js / Prisma

$ErrorActionPreference = "Stop"

$instance = "MSSQL17.MSSQLSERVER"
$tcpKey = "HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server\$instance\MSSQLServer\SuperSocketNetLib\Tcp"
$loginModeKey = "HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server\$instance\MSSQLServer"
$dbName = "flux_store"
$sqlUser = "flux_app"
$sqlPassword = "FluxStore2026!"

Write-Host "Включаем TCP/IP..."
Set-ItemProperty -Path $tcpKey -Name Enabled -Value 1
Set-ItemProperty -Path "$tcpKey\IPAll" -Name TcpPort -Value "1433"
Set-ItemProperty -Path "$tcpKey\IPAll" -Name TcpDynamicPorts -Value ""

Write-Host "Включаем смешанную аутентификацию (LoginMode=2)..."
Set-ItemProperty -Path $loginModeKey -Name LoginMode -Value 2

Write-Host "Перезапуск SQL Server..."
Restart-Service MSSQLSERVER -Force
Start-Sleep -Seconds 5

Write-Host "Создаём логин $sqlUser и права на $dbName..."
$sql = @"
IF DB_ID('$dbName') IS NULL CREATE DATABASE [$dbName];
IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = '$sqlUser')
    CREATE LOGIN [$sqlUser] WITH PASSWORD = '$sqlPassword', CHECK_POLICY = OFF;
ELSE
    ALTER LOGIN [$sqlUser] WITH PASSWORD = '$sqlPassword', CHECK_POLICY = OFF;
USE [$dbName];
IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = '$sqlUser')
    CREATE USER [$sqlUser] FOR LOGIN [$sqlUser];
ALTER ROLE db_owner ADD MEMBER [$sqlUser];
"@

sqlcmd -S localhost -E -Q $sql

Write-Host ""
Write-Host "Готово. Проверка порта 1433:"
netstat -ano | findstr ":1433"
Write-Host ""
Write-Host "Дальше в обычном PowerShell:"
Write-Host "  cd c:\Users\zzki\flux-store"
Write-Host "  npm run seed -w @flux/api"
