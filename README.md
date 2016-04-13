# info474-vis-design
The purpose of this assignment is to challenge your ability to effectively leverage visual encodings to answer specific
questions about a dataset.

## Access
**Repository**
https://github.com/Raktos/info474-vis-design

**Live**
http://students.washington.edu/raktos/info474/vis-design/

## Persona
Emery Gregg, age 46

Emery is a pharmaceutical researcher. His job is to create new drugs and medications to help people. The company wants
to make a profit, but for Emery it isn't about the money it is about helping people. As such he makes proposals based
solely on how effective he thinks a drug will be. Whether his proposals are funded past initial exploratory research or
not us up to the company and out of his hands.

Emery wants to know more about anti-bacterial drugs and their effects on various types of bacteria. He is lookaing at
this dataset as part of his exploratory research on the subject.

## Visualization 1 : Drug Effectiveness Boxplot
The primary visual encoding for this visualization is position along an aligned scale. The position of any given section
of the box tells the reader what how high the concentration must be to efectively stop bacterial growth. The median line
in the middle of the boxplot is the primary data point for comparison. Because this is the most important of the comparisons
to be made I chose the most accurate perceptual task.

The secondary encodings are comparisons of length and color. Color in this case is simple, it seperates the categoies, bacteria
that are gram positive, those that are gram negative, and the box that contains both. The colors are not at all similar (with the
possible exception of red and green for the red-green colorblind) with green indicating positive and red negative. Blue was chosen
for a neutral color that resembles neither green nor red.

The comparisons of length allow the reader to see which drugs are the most consistant. Long boxes mean a large spread, and long
lines for outliers show some bacteria being more resistant. As an example, penecilin has a very large spread of concentrations to kill
compared to Streptomycin which has a very small range.

The groupings allow the reader to see multiple points of data for each drug, and compare them within the drug and to other drugs. The
"Combined" bar in each drug is used to compare all values between drugs, which for example shows penicilin has much more variance. The
other groups in penicilin show how penicilin has very different effects on gram positive bacteria vs gram negaive bacteria. The conclusion that
maybe the cell wall's have something to do with how penicilin works could be made here for example.

My targeted persona is a scientist and understands how concentrations work so I did not find it necessary to try and reverse
how concentrations are shown to put the most powerful drugs at the "top." I also adopted a logrithmic scale because of the massive range
that values take and rationalized it similarly, a scientist would be comfortable with a logrithmic scale.

## Visualization 2 : Bacterial Resistance Boxplot
This visualization is very similar to the first. Position along an aligned scale is the main perceptual task which informs the reader which bacteria are most
resistant (highest concentrations to stop growth) and which are the least (lowest concentrations). I (attempted) to order them from most resistant
(highest required concentrations) to least (lowest). The boxplots are not idea for such a small data sample, but they give a good picture of
how resistant a bacteria is in general, and how much its resistance tends to change between different drugs.

This comparison of resistance variance is done in the same way it was in visualization 1; length comparisons. With so many boxes
it gets a little harder to do accurate length comparisons when the lengths are very similar but across the entire dataset it is
easy to see which bacteria have much more variance and which have much less. This tradoff of less accuracy is acceptable as this is
a secondary encoding of information.

As with the first visualization I used a logrithmic scale because of the huge difference between values and maintained the raw concentration
values instead of attempting to put most resistant bacteria at the top. The rationalization is the same, the target audience
is scientists who understand how the data works and would prefer the actual data instead of a transoformation of it the put
things a the top.

## Visualization 3 : Bacterial Resistance Bargraph
This visualization again uses position along an aligned as its primary visual encoding. The positions of the tops of the bars
indicate how much concentration is required to stop bacterial growth, higher indicating a more resistant bacteria. I used position in this,
as with the previous, because it is the most accurate. It show very similar information to the previous visualization but separates in that
it does not show the range of variance easily, but does show the individual data points for each drug.

The secondary encoding is color, indicating each individual drug. The colors are relatively neutral when used with each other,
none indicated a relationship to another. This allows the reader to see the comparisons between each drug for each bacteria easily,
though it makes comparisons between different bacterias harder. That however was handled by the previous visualization.

Again a logrithmic scale was used and the concentrations were left as their raw values, so a higher value means a more resistant
bacteria not a more effective drug. This is again rationalized by the audience; a scientist would understand if not be expecting
this sort of information from this sort of study.