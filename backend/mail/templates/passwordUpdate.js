exports.passwordUpdated = (email, name) => {
	return `<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Password Update Confirmation | NRET</title>
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
		.highlight {
			font-weight: bold;
			color: #2563eb;
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
				<div class="greeting">Hey ${name},</div>
				<div class="message">
					Your password has been successfully updated for the email <span class="highlight">${email}</span>.
				</div>
				<div class="message">
					If you did not request this password change, please contact us immediately to secure your account.
				</div>
			</div>
			<div class="footer">
				<div class="support">
					If you have any questions or need further assistance, please feel free to reach out to us at <br>
					<a href="mailto:33binilb@gmail.com">33binilb@gmail.com</a>.
				</div>
			</div>
		</div>
	</div>
</body>
</html>`;
};

exports.resetPasswordTemplate = (resetUrl, name) => {
	return `<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Password Reset | NRET</title>
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
		.button {
			display: inline-block;
			background-color: #2563eb;
			color: #ffffff;
			text-decoration: none;
			padding: 14px 28px;
			border-radius: 8px;
			font-weight: 600;
			margin: 20px 0;
		}
		.button:hover {
			background-color: #1d4ed8;
		}
		.note {
			font-size: 14px;
			color: #64748b;
			margin-top: 20px;
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
					You requested to reset your password. Click the button below to set a new password:
				</div>
				<div style="text-align: center;">
					<a href="${resetUrl}" class="button">Reset Password</a>
				</div>
				<div class="note">
					This link will expire in 5 minutes. If you didn't request this, please ignore this email.
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
