$html = Get-Content -Path "app.html" -Raw
$css = Get-Content -Path "app.css" -Raw
$jsConfig = Get-Content -Path "config.js" -Raw
$jsApp = Get-Content -Path "app.js" -Raw

# Remove comments/sourcemaps if simple (optional, skipping for safety)

# Embed CSS
$styleTag = "<style>`n$css`n</style>"
$html = $html -replace '<link rel="stylesheet" href="app.css">', $styleTag

# Embed Config JS
$scriptConfig = "<script>`n$jsConfig`n</script>"
$html = $html -replace '<script src="config.js"></script>', $scriptConfig

# Embed App JS
$scriptApp = "<script>`n$jsApp`n</script>"
$html = $html -replace '<script src="app.js"></script>', $scriptApp

# Create dist if not exists
if (!(Test-Path "dist")) { New-Item -ItemType Directory -Force -Path "dist" }

# Save bundled file
$html | Set-Content -Path "dist/index.html" -Encoding UTF8

Write-Host "Bundled successfully to dist/index.html"
