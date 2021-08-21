interface Config {
  /**
   * botコマンドのprefix
   * @example "!"
   */
  prefix: string;
  /** botの所有者となるユーザID */
  ownerId: string[];
  /**
   * コマンド実行を許可するチャンネルID
   * @description 空配列の場合はチェックしない
   */
  allowedCommandChannel: string[];
  /**
   * コマンド実行を許可するロールID
   * @description 空配列の場合はチェックしない
   */
  allowedCommandRole: string[];
  /**
   * Discord botのトークン
   * @see https://discord.com/developers/applications
   */
  token: string;
  /** botコマンド */
  commands: {
    broadcast: Command;
    camera: Command;
    commentary: Command;
  };
}

type Command = {
  /** 投稿文のprefix */
  commentPrefix: string;
  list: [
    {
      /**
       * 種別
       * @example "srt1"
       */
      type: string;
      /**
       * URL
       * @example "'https://vdo.ninja/?xxxxx'"
       */
      url: string;
    }
  ];
};
