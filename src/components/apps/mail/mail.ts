// MailComponent.ts
import { html, css } from "lit";
import { customElement, state, property } from "lit/decorators.js";

import { StyledElement } from "../../../utils/globalStyledElement";
import { basic, styles } from "./styles";
import "./MailItemComponent";
import {formatDate} from "./formatDate";

@customElement("mail-component")
export class Mail extends StyledElement {
  @property({ type: String, attribute: "filelink" }) filelink:
    | string
    | undefined;

  @state() mails: any[] = [];
  @state() selectedMail: any = null;
  @state() styles = [basic, css``];
  @state() selectedMailContent: string = "";
  @state() currentStyle = "";

  static appName = "Mail";

  async connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add("c-mail");
    this.classList.add("c-app");
    if (this.filelink) {
      this.mails = await this.fetchMails(this.filelink);
      this.sortMails();
      this.selectMail(this.mails[0]);
    } else {
      this.mails = await this.fetchMails(
        `/content/${this.currentStyle}/mail/mail.json`
      );
      this.selectMail(this.mails[0]);
      this.sortMails();
    }
  }

  updateStyles() {
    this.styles = this.applyStyles(styles, basic);
    this.currentStyle = this.globalStyleController.style;
  }

  async fetchMails(filelink: string): Promise<any[]> {
    if (!filelink) return this.mails;
    try {
      const response = await fetch(filelink);
      const mails = await response.json();
      return mails;
    } catch (error) {
      return this.mails;
    }
  }

  async selectMail(mail: any) {
    mail.read = true;
    this.selectedMail = mail;
    this.selectedMailContent = this.selectedMail.content;
  }

  sortMails() {
    this.mails.sort((a, b) => {
      const dateA = new Date(a.date + "T" + a.hour);
      const dateB = new Date(b.date + "T" + b.hour);
      return dateB.getTime() - dateA.getTime();
    });
  }

  async fetchFileContent(filelink: string): Promise<string> {
    const response = await fetch(filelink);
    const htmlContent = await response.text();
    return htmlContent;
  }

  render() {
    return html`
      <style>
        ${this.styles}
      </style>

      <div class="c-mail__list">
        ${this.mails.map(
          (mail) => html`
            <mail-item-component
              .mail="${mail}"
              .read="${mail.read}"
              @click="${() => this.selectMail(mail)}"
            >
            </mail-item-component>
          `
        )}
      </div>
      <div class="c-mail__content-container">
        ${this.selectedMail
          ? html`
              <div class="c-mail-content__head">
                <div class="c-mail-content__infos">
                  <p class="c-mail-content__from">${this.selectedMail.from}</p>
                  <h3 class="c-mail-content__object">
                    ${this.selectedMail.object}
                  </h3>
                </div>
                <p class="c-mail-content__date">
                  ${this.selectedMail.hour} - ${formatDate(this.selectedMail.date)}
                </p>
              </div>
              ${this.selectedMail.filelink
                ? html`<div class="c-mail__content">
                  ${this.selectedMailContent}
                  <div class="c-mail-content__img-container">
                    <img class="c-mail-content__img" src="${"/content/" + this.currentStyle + "/mail/files/" + this.selectedMail.filelink}" alt="">
                  </div>
                </div>`
                : html`<div class="c-mail__content">
                    ${this.selectedMailContent}
                  </div>`}
              <div class="c-mail__footer">
                <div class="c-mail__reply" contenteditable></div>
                <button class="c-mail__button">Reply</button>
              </div>
            `
          : html`<p>Select a mail to read.</p>`}
      </div>
    `;
  }
}
