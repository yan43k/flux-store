# Запускать от имени администратора: включить смешанную аутентификацию (Windows + SQL).
# LoginMode: 1 = только Windows, 2 = смешанный режим.

$ErrorActionPreference = "Stop"

$loginModeKey = "HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.MSSQLSERVER\MSSQLServer"
Set-ItemProperty -Path $loginModeKey -Name LoginMode -Value 2

Restart-Service MSSQLSERVER -Force
Start-Sleep -Seconds 4

Write-Host "Смешанная аутентификация включена (LoginMode=2)."
