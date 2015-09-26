String.prototype.visualLength = function(px)
{
    var ruler = document.getElementById('ruler');
	ruler.style.size = px;
    ruler.innerHTML = this;
    return ruler.offsetWidth;
}