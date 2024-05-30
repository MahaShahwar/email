import axios from "axios";
import { esClient } from "../../models/email.index";
import { User } from "../../utils/interfaces/user/login.interface";

export const fetchEmails = async (user: User) => {
  try {
    const response = await axios.get(
      `https://graph.microsoft.com/v1.0/me/messages`,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    return response.data.value;
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error;
  }
};

export const syncEmails = async (user: User) => {
  const emails = await fetchEmails(user);
  for (const email of emails) {
    await esClient.index({
      index: "emails",
      id: email.id,
      body: {
        userId: user.id,
        emailId: email.id,
        subject: email.subject,
        body: email.body.content,
        from: email.from.emailAddress.address,
        to: email.toRecipients
          .map((recipient: any) => recipient.emailAddress.address)
          .join(", "),
        dateReceived: email.receivedDateTime,
        isRead: email.isRead,
        isFlagged: email.flag.flagStatus === "flagged",
      },
    });
  }
};
