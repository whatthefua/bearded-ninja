function init()
{
	if(localStorage.getItem("played") != "true")
	{
		window.stage = "tutorial";
		tutorialInit();
	} else {
		window.stage = "menu";
	}
}