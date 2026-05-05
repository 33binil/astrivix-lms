exports.courseEnrollmentEmail = (courseName, name) => {
    return `<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Course Registration Confirmation | NRET</title>
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
		.cta {
			display: inline-block;
			padding: 12px 24px;
			background-color: #3b82f6;
			color: #ffffff;
			text-decoration: none;
			border-radius: 8px;
			font-size: 16px;
			font-weight: 600;
			margin-top: 10px;
			margin-bottom: 20px;
			text-align: center;
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
				<div class="greeting">Dear ${name},</div>
				<div class="message">
					You have successfully registered for the course <span class="highlight">"${courseName}"</span>. We are excited to have you as a participant!
				</div>
				<div class="message">
					Please log in to your learning dashboard to access the course materials and start your learning journey.
				</div>
				<div style="text-align: center;">
					<a class="cta" href="https://nano-robotics-embed-technologies.vercel.app/dashboard/enrolled-courses">Go to Dashboard</a>
				</div>
			</div>
			<div class="footer">
				<div class="support">
					If you have any questions or need assistance, please feel free to reach out to us at <br>
					<a href="mailto:33binilb@gmail.com">33binilb@gmail.com</a>.
				</div>
			</div>
		</div>
	</div>
</body>
</html>`;
};