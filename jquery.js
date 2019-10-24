7z¼¯' Í3æ,å      N       êÔï»¿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Windows.Forms;

namespace SpdOpenAct_EngAddr
{
    //â­ââââââââââââââââââââââââââââ®
    //â Note:   [æç¨] ç·ä¸éæ¶è½æª for ç¿»è­¯è±æå°å         â
    //â         éµå± EXCEL æª ( ä¸åæè½ä¸æ¬¡ )               â
    //â Tables:                                              â
    //â         SpdOpenAct_Eng_CityTown                      â
    //â         SpdOpenAct_Eng_Road                          â
    //â         SpdOpenAct_Eng_Village                       â
    //â Author: Wesley                                       â
    //â Date:   2019/10/24                                   â
    //â°ââââââââââââââââââââââââââââ¯
    static class Program
    {
        [STAThread]
        static void Main()
        {
            //Step 1ï¼å¯å¥ [ç¸£å¸+éé®å¸å] CityTown.xls â SpdOpenAct_Eng_CityTown
            Get_CityTown();
            //Step 2ï¼å¯å¥ [éè·¯/è¡å/æé] Road.xls â SpdOpenAct_Eng_Road

            //Step 3ï¼å¯å¥ [éãé°] Village.xls â SpdOpenAct_Eng_Village

        }

        #region === Step 1ï¼å¯å¥ [ç¸£å¸+éé®å¸å] CityTown.xls â SpdOpenAct_Eng_CityTown ===
        public static void Get_CityTown()
        {
            //æªæ¡å¯¦é«è·¯å¾
            string Str_File = Application.StartupPath + @"\CityTown.xls";

            if (File.Exists(Str_File))
            {
                //é£æ¥Excelè³æåº«
                //HDR=YES/NO ç¬¬ä¸è¡æ¯å¦çºæ¨é¡
                //IMEX=0 æçºãå¯åºæ¨¡å¼ãï¼ Excel æªæ¡åªè½ç¨ä¾åãå¯«å¥ãç¨éã
                //IMEX=1 æçºãå¯å¥æ¨¡å¼ãï¼ Excel æªæ¡åªè½ç¨ä¾åãè®åãç¨éã
                //IMEX=2 æçºãé£çµæ¨¡å¼ãï¼Excel æªæ¡ãè®å¯«ãã
                //ImportMixedTypes=Text é è¨­æå°æ¬ä½çè³ææ ¼å¼èªåè½ææå­(Text)æ ¼å¼
                //TypeGuessRows=0
                OleDbConnection OLE_Conn = new OleDbConnection("Provider=Microsoft.Jet.OLEDB.4.0;Data Source='" + Str_File + "';Extended Properties='Excel 8.0;HDR=NO;IMEX=1;ImportMixedTypes=Text;TypeGuessRows=0;'");
                //OleDbConnection OLE_Conn = new OleDbConnection("Provider=Microsoft.ACE.OLEDB.12.0;Data Source='" + Str_File + "';Extended Properties='Excel 8.0;HDR=YES;IMEX=1;ImportMixedTypes=Text;TypeGuessRows=0;'");
                OLE_Conn.Open();

                //åå¾ææ Sheet åç¨±
                DataTable DT_Sheets = OLE_Conn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                OleDbDataAdapter OLE_Table = new OleDbDataAdapter("SELECT * FROM [" + DT_Sheets.Rows[0]["TABLE_NAME"].ToString().Trim() + "]", OLE_Conn);
                DataTable DT_Data = new DataTable();
                OLE_Table.Fill(DT_Data);

                if (DT_Data.Rows.Count > 0)
                {
                    for (int RIndex = 0; RIndex < DT_Data.Rows.Count; RIndex++)
                    {
                        string Str_Line = DT_Data.Rows[RIndex][0].ToString() + DT_Data.Rows[RIndex][1].ToString() + DT_Data.Rows[RIndex][2].ToString();
                        LogClass.WriteLog("Log", Str_Line);
                    }
                }
            }
        }
        #endregion
    }
}
 	å   å 
B®É   P r o g r a m . c s   
 e¯GÖpÕ       