USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Candidates_SelectAllV3]    Script Date: 5/1/2022 8:19:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Jeff Moya
-- Create date: 4/12/2022
-- Description: Select All Procedure
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer:
-- =============================================


ALTER Proc [dbo].[Candidates_SelectAllV3]

AS
/*

-----Test Code ------

execute dbo.Candidates_SelectAllV3
*/

BEGIN
	
SELECT [Surnames]
		,[Id]

	FROM [dbo].[Candidates]

	END

