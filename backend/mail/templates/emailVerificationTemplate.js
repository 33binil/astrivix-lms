const otpTemplate = (otp, name) => {
	return `<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>OTP Verification Email | NRET</title>
	<style>
		body {
			background-color: #f8fafc;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
			font-size: 16px;
			line-height: 1.6;
			color: #334155;
			margin: 0;
			padding: 0;
		}

		.wrapper {
			padding: 40px 20px;
			background-color: #f8fafc;
		}

		.container {
			max-width: 600px;
			margin: 0 auto;
			background-color: #ffffff;
			border-radius: 16px;
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
			overflow: hidden;
		}

		.header {
			background-color: #0f172a;
			padding: 30px;
			text-align: center;
			border-bottom: 4px solid #3b82f6;
		}

		.logo {
			max-width: 180px;
			height: auto;
		}

		.content {
			padding: 40px;
		}

		.greeting {
			font-size: 20px;
			font-weight: 600;
			color: #0f172a;
			margin-bottom: 16px;
		}

		.message {
			margin-bottom: 24px;
		}

		.otp-box {
			background-color: #f1f5f9;
			border: 2px dashed #cbd5e1;
			border-radius: 12px;
			padding: 24px;
			text-align: center;
			margin: 32px 0;
		}

		.otp-code {
			font-size: 36px;
			font-weight: 800;
			letter-spacing: 6px;
			color: #2563eb;
			margin: 0;
		}

		.validity {
			font-size: 14px;
			color: #64748b;
			margin-top: 8px;
		}

		.footer {
			background-color: #f8fafc;
			padding: 24px;
			text-align: center;
			border-top: 1px solid #e2e8f0;
		}

		.support {
			font-size: 14px;
			color: #64748b;
		}

		.support a {
			color: #3b82f6;
			text-decoration: none;
			font-weight: 500;
		}
	</style>
</head>
<body>
	<div class="wrapper">
		<div class="container">
			<div class="header">
				<a href="https://nano-robotics-embed-technologies.vercel.app">
					<img class="logo" src="https://nano-robotics-embed-technologies.vercel.app/nret-logo.png" alt="NRET Logo">
				</a>
			</div>
			<div class="content">
				<div class="greeting">Hello ${name},</div>
				<div class="message">
					Welcome to <strong>Nano Robotics Embed Technologies (NRET)</strong>! To complete your registration securely, please use the following One-Time Password (OTP):
				</div>
				<div class="otp-box">
					<h2 class="otp-code">${otp}</h2>
					<div class="validity">This code is valid for 5 minutes</div>
				</div>
				<div class="message" style="font-size: 14px; color: #64748b;">
					If you did not request this verification, please ignore this email. Your account will remain secure.
				</div>
			</div>
			<div class="footer">
				<div class="support">
					Need assistance? Contact our support team at <br>
					<a href="mailto:33binilb@gmail.com">33binilb@gmail.com</a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>`;
};
module.exports = otpTemplate;