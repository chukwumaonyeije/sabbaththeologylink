# PowerShell script to add Firebase environment variables to Vercel
# Run this script to batch add all required environment variables

Write-Host "Adding Firebase environment variables to Vercel..." -ForegroundColor Green

# Set the environment variables
$env:NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyAamVOgH_4fse26cxOURwLSOzeoKFwB8ws"
$env:NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="sabbaththeologylink.firebaseapp.com"
$env:NEXT_PUBLIC_FIREBASE_PROJECT_ID="sabbaththeologylink"
$env:NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="sabbaththeologylink.firebasestorage.app"
$env:NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="710694348415"
$env:NEXT_PUBLIC_FIREBASE_APP_ID="1:710694348415:web:f9bf6761128501725d414a"

# Add each environment variable to Vercel
Write-Host "Adding NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN..."
echo "sabbaththeologylink.firebaseapp.com" | vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production preview development

Write-Host "Adding NEXT_PUBLIC_FIREBASE_PROJECT_ID..."
echo "sabbaththeologylink" | vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production preview development

Write-Host "Adding NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET..."
echo "sabbaththeologylink.firebasestorage.app" | vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production preview development

Write-Host "Adding NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID..."
echo "710694348415" | vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production preview development

Write-Host "Adding NEXT_PUBLIC_FIREBASE_APP_ID..."
echo "1:710694348415:web:f9bf6761128501725d414a" | vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production preview development

Write-Host "All environment variables added! Now deploying..." -ForegroundColor Green
vercel --prod

Write-Host "Deployment complete!" -ForegroundColor Green