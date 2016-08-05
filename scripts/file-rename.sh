FILES=`find \`pwd\` -name 0-index.md`
for FILE in $FILES
do
    echo $FILE
    NEWFILE=`echo $FILE | sed 's/0-index.md/index.md/'`
    echo $NEWFILE
    git mv $FILE $NEWFILE
done
